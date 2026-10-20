import { afterEach, describe, expect, it } from "vitest";
import { DEFAULT_BRANDING, getBranding } from "./Branding";

const setEnv = (values: Record<string, string>) => {
    const data = Object.fromEntries(
        Object.entries(values).map(([key, value]) => [
            key,
            { sensitive: false, type: "string", value },
        ])
    );
    window.localStorage.setItem("env_data", JSON.stringify(data));
};

describe("getBranding", () => {
    afterEach(() => window.localStorage.removeItem("env_data"));

    it("looks like FAM when env.json sets nothing", () => {
        setEnv({ target_env: "dev" });

        expect(getBranding()).toEqual(DEFAULT_BRANDING);
    });

    it("looks like FAM when there is no env data at all", () => {
        expect(getBranding()).toEqual(DEFAULT_BRANDING);
    });

    it("takes each value env.json sets", () => {
        setEnv({
            app_name: "Epsilon Access Management",
            app_acronym: "EAM",
            landing_image_url: "/branding/landing.jpg",
            landing_image_alt: "A locked door",
            landing_image_fit: "natural",
        });

        expect(getBranding()).toEqual({
            name: "Epsilon Access Management",
            acronym: "EAM",
            landingImageUrl: "/branding/landing.jpg",
            landingImageAlt: "A locked door",
            landingImageFit: "natural",
        });
    });

    it("crops to fill unless the fit is exactly natural", () => {
        // An unknown value must not leave the photograph unstyled.
        setEnv({ landing_image_fit: "stretch" });

        expect(getBranding().landingImageFit).toBe("cover");
    });

    it("keeps FAM's value for a key left blank", () => {
        /*
            The ConfigMap template writes every key, blank when a deployment
            does not override it. Blank has to mean "not set", or a deployment
            that changes only the name would lose its photograph.
        */
        setEnv({ app_name: "Epsilon Access Management", landing_image_url: "  " });

        const branding = getBranding();
        expect(branding.name).toBe("Epsilon Access Management");
        expect(branding.landingImageUrl).toBe(DEFAULT_BRANDING.landingImageUrl);
    });
});
