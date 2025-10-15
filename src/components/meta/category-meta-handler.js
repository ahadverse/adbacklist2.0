const categoryMeta = (city, category) => {
  const formattedCity = city
    ? city
        .toString()
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ")
    : "";

  const formattedCategory = category
    ? category
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
      keywords: `skip the games alternative,
free escort ads,
free personal ads,
personal ad free,
hookers for sale`,
    },

    dating: {
      title: `${prefix} Skip The Games Alternative – Adbacklist`,
      description: `${prefix} craigslist alternative for free posting ads for Housing, for sale, vehicles, mega personal classifieds, create your local sales network on adbacklist.`,
      keywords: `skip the games alternative,
free escort ads,
free personal ads,
personal ad free,
hookers for sale`,
    },

    housing: {
      title: `${prefix} free Classifieds Ads for Housing, Rooms | Adbacklist`,
      description: `${prefix}   Free classified ads for Housing, cheap apartments, condos, room shares & rentals. What you are looking for, or create your own ad for free on adBacklist.`,
      keywords: `rooms for rent in ${prefix},
houses for sale in ${prefix},
condos for sale in ${prefix},
condos on rent`,
    },

    community: {
      title: `${prefix}   International Community Centre & Local Listings | Adbacklist`,
      description: `${prefix}   International Community Centre Listings for events, services, buy & sell, Local News, & create a community market weekly ad on adBacklist.`,
      keywords: `international community centre,
community market weekly ad,
community ads,
community market ad`,
    },

    "for-sale": {
      title: `For Sale in ${prefix}   – OfferUp Ads on Adbacklist`,
      description: `For Sale in ${prefix}  , offerUp seattle tickets, cars, electronics, Auto Parts, furniture, clothes & more - create local sales network on adbacklist.`,
      keywords: `${formattedCategory} for sell in ${prefix},
offerup seattle ${formattedCategory},
offerup ${prefix}`,
    },

    jobs: {
      title: `Latest Job Listings in ${prefix}   | Adbacklist`,
      description: `Search updated job listings in ${prefix}  , Post jobs or apply for jobs across multiple categories—cna jobs near me, part time social work jobs | Adbacklist.`,
      keywords: `job listing ${prefix},
ad posting jobs in ${prefix},
part time social work jobs,
cna jobs near me`,
    },

    services: {
      title: `${prefix}   classified ads services – adbacklist`,
      description: `${prefix}   classified ads services – Adbacklist helps you hire cleaners, Business, Automotive, Health-Beauty, Events & more –craigslist alternative`,
      keywords: `classified ads services`,
    },

    vehicles: {
      title: `Vehicles for Sale in ${prefix}   – buy & sale on Adbacklist `,
      description: `vehicles for sale in ${prefix}   on Adbacklist. buy & sale cars, trucks, supreme automobiles, quality auto parts & more. create your local sales network`,
      keywords: `${formattedCategory} vehicles for sale in ${prefix},
construction vehicles,
quality auto parts,
used cars for sale richmond va,
automobile advantages,
supreme automobiles`,
    },
  };
};

export default categoryMeta;
