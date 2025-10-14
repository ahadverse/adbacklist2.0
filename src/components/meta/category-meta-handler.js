const categoryMeta = (city) => {
  const formattedCity = city
    ? city
        .toString()
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";

  const prefix = formattedCity ? `${formattedCity}` : "";

  return {
    adult: {
      title: `${prefix} Skip The Games Alternative – Adbacklist`,
      description: `${prefix} craigslist alternative for free posting ads for Housing, for sale, vehicles, mega personal classifieds, create your local sales network on adbacklist.`,
      keywords: ``,
    },

    dating: {
      title: `${prefix} Skip The Games Alternative – Adbacklist`,
      description: `${prefix} craigslist alternative for free posting ads for Housing, for sale, vehicles, mega personal classifieds, create your local sales network on adbacklist.`,
      keywords: ``,
    },

    housing: {
      title: `${prefix} free Classifieds Ads for Housing, Rooms | Adbacklist`,
      description: `${prefix}   Free classified ads for Housing, cheap apartments, condos, room shares & rentals. What you are looking for, or create your own ad for free on adBacklist.`,
      keywords: ``,
    },

    community: {
      title: `${prefix}   International Community Centre & Local Listings | Adbacklist`,
      description: `${prefix}   International Community Centre Listings for events, services, buy & sell, Local News, & create a community market weekly ad on adBacklist.`,
      keywords: ``,
    },

    "for-sale": {
      title: `For Sale in ${prefix}   – OfferUp Ads on Adbacklist`,
      description: `For Sale in ${prefix}  , offerUp seattle tickets, cars, electronics, Auto Parts, furniture, clothes & more - create local sales network on adbacklist.`,
      keywords: ``,
    },

    jobs: {
      title: `Latest Job Listings in ${prefix}   | Adbacklist`,
      description: `Search updated job listings in ${prefix}  , Post jobs or apply for jobs across multiple categories—cna jobs near me, part time social work jobs | Adbacklist.`,
      keywords: ``,
    },

    services: {
      title: `${prefix}   classified ads services – adbacklist`,
      description: `${prefix}   classified ads services – Adbacklist helps you hire cleaners, Business, Automotive, Health-Beauty, Events & more –craigslist alternative`,
      keywords: ``,
    },

    vehicles: {
      title: `Vehicles for Sale in ${prefix}   – buy & sale on Adbacklist `,
      description: `vehicles for sale in ${prefix}   on Adbacklist. buy & sale cars, trucks, supreme automobiles, quality auto parts & more. create your local sales network`,
      keywords: ``,
    },
  };
};

export default categoryMeta;
