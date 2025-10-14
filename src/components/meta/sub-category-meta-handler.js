const subCategoryMeta = (city, subCategory) => {
  const formattedCity = city
    ? city
        .toString()
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";
  const formattedsubCategory = subCategory
    ? subCategory
        .toString()
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";

  const prefix = formattedCity ? `${formattedCity}` : "";

  return {
    adult: {
      title: `Adult Jobs | skip the games alternative in ${prefix}   – Adbacklist`,
      description: `Create ${formattedsubCategory}     in ${prefix}  . post or browse skip the games alternative ads for free escort & free personal ads on Adbacklist | craigslist alternative`,
      keywords: ``,
    },

    dating: {
      title: `Adult Jobs | skip the games alternative in ${prefix}   – Adbacklist`,
      description: `Create ${formattedsubCategory}     in ${prefix}  . post or browse skip the games alternative ads for free escort & free personal ads on Adbacklist | craigslist alternative`,
      keywords: ``,
    },

    housing: {
      title: `Rooms for Rent in ${prefix}  , free classified ads on Adbacklist.`,
      description: `Descriptions- rooms for rent in ${prefix}  . Post free local classified ads for housing & find What you are looking for, or create your own ad for free on AdBacklist.`,
      keywords: ``,
    },

    community: {
      title: `${formattedsubCategory}     Community Classifieds Ads in ${prefix}  , Adbacklist`,
      description: `${formattedsubCategory}     community classifieds in ${prefix}  . Create your own ad posts for events, services & local groups only on Adbacklist.`,
      keywords: ``,
    },

    "for-sale": {
      title: `For Sale in ${prefix}   – OfferUp Ads on Adbacklist`,
      description: `For Sale in ${prefix}  , offerUp seattle tickets, cars, electronics, Auto Parts, furniture, clothes & more - create local sales network on Adbacklist`,
      keywords: ``,
    },

    jobs: {
      title: `${formattedsubCategory}     Job Listings in ${prefix}   | Adbacklist`,
      description: `${formattedsubCategory}     job listings in ${prefix}  , Post jobs or apply for jobs across multiple categories—cna jobs near me, part time social work jobs | Adbacklist`,
      keywords: ``,
    },

    services: {
      title: `${prefix}   classified ads services – adbacklist`,
      description: `${prefix}   ${formattedsubCategory}     classified ads services – Adbacklist helps you hire cleaners, Business, Automotive, Health-Beauty, Events & more –craigslist alternative`,
      keywords: ``,
    },

    vehicles: {
      title: `Vehicles for Sale in ${prefix}   – buy & sale on Adbacklist `,
      description: `${formattedsubCategory}     vehicles for sale in ${prefix}   on Adbacklist. buy & sale cars, trucks, supreme automobiles, quality auto parts & more. create your local sales network`,
      keywords: ``,
    },
  };
};

export default subCategoryMeta;
