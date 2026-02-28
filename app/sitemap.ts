import { MetadataRoute } from "next";
import { siteConfig } from "./shared-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        "",
        "/pages/events-street",
        "/pages/competition-bazaar",
        "/pages/merch-store",
        "/pages/sponsor-alley",
        "/pages/virtual-expedition",
    ];

    return routes.map((route) => ({
        url: `${siteConfig.url}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8,
    }));
}
