import { SiteSettings } from "../models/SiteSettings.js";
import { AppError } from "../utils/AppError.js";

import type {
  CreateSiteSettingsInput,
  UpdateSiteSettingsInput
} from "../validators/siteSettings.validator.js";

export async function getSiteSettings() {
  return SiteSettings.findOne().lean();
}

export async function createSiteSettings(
  input: CreateSiteSettingsInput
) {
  const existing =
    await SiteSettings.findOne();

  if (existing) {
    throw new AppError(
      "Site settings already exist. Use update instead.",
      409
    );
  }

  return SiteSettings.create({
    ...input
  });
}

export async function updateSiteSettings(
  input: UpdateSiteSettingsInput
) {
  let settings =
    await SiteSettings.findOne();

  if (!settings) {
    const cleanInput =
      Object.fromEntries(
        Object.entries(input).filter(
          ([, value]) => value !== undefined
        )
      ) as CreateSiteSettingsInput;

    settings =
      await SiteSettings.create(
        cleanInput
      );

    return settings;
  }

  Object.entries(input).forEach(
    ([key, value]) => {
      if (value !== undefined) {
        settings.set(key, value);
      }
    }
  );

  await settings.save();

  return settings;
}

export async function deleteSiteSettings() {
  const settings =
    await SiteSettings.findOne();

  if (!settings) {
    throw new AppError(
      "Site settings not found",
      404
    );
  }

  await settings.deleteOne();

  return settings;
}