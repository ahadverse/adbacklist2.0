import cats from "../../public/category-sitemap.json";
import cities from "../../public/sitemap.json";

function generateSiteMap(categories, cities) {
  const urls = [];

  // Iterate through each city
  cities.forEach((city) => {
    // Iterate through each category
    categories.forEach((category) => {
      const url = `
        <url>
          <loc>https://adbacklist.com/posts/${category?.parentId}/${category?.name}?city=${city?.name}</loc>
        </url>
      `;
      urls.push(url);
    });
  });

  // Join all URLs and wrap them in the XML structure
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join("")}
    </urlset>
  `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap(cats, cities);
  res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
