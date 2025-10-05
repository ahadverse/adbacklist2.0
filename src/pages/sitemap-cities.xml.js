import cities from "../../public/sitemap.json";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
       <!--We manually set the two URLs we know already-->

       ${posts

         .map((id) => {
           return `
       
       <url>
   
     <loc>https://adbacklist.com/categories/${id?.name}</loc>
       </url>
       `;
         })
         .join("")}
     </urlset>
   `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap(cities);
  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;

{
  /*<loc>
  https://localplumbers.us/city/${id?.zip}-${id?.city}-${id?.state}
</loc>;*/
}
