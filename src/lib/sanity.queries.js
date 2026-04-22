export const IMAGE_ASSET_FIELDS = `
  _id,
  url,
  metadata{
    dimensions{
      width,
      height,
      aspectRatio
    }
  }
`;

export const SIMPLE_IMAGE_FIELDS = `
  crop,
  hotspot,
  asset->{
    ${IMAGE_ASSET_FIELDS}
  }
`;

export const IMAGE_WITH_ALT_FIELDS = `
  alt,
  crop,
  hotspot,
  asset->{
    ${IMAGE_ASSET_FIELDS}
  }
`;

export const HOME_DESKTOP_QUERY = `
*[_type == "carouselHome"][0]{
  images[]{
    alt,
    image{
      ${SIMPLE_IMAGE_FIELDS}
    }
  }
}
`;

export const HOME_MOBILE_QUERY = `
*[_type == "carouselHomeMobile"][0]{
  images[]{
    alt,
    image{
      ${SIMPLE_IMAGE_FIELDS}
    }
  }
}
`;

/* =========================
   PROJETOS
========================= */

export const WORKS_QUERY = `
*[_type == "projetos"]  {
  _id,
  title,
  "slug": slug.current,
  year,
  data,
  sortDate,
  subtitle,
  hoverPair[]{
    ${SIMPLE_IMAGE_FIELDS}
  },
  "img1": hoverPair[0]{
    ${SIMPLE_IMAGE_FIELDS}
  },
  "img2": hoverPair[1]{
    ${SIMPLE_IMAGE_FIELDS}
  }
}
`;

export const WORK_SINGLE_QUERY = `
*[_type == "projetos" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  data,
  year,
  cliente,
  tipo,
  local,
  agradecimentos,
  creditos,
  description,
  fichaTecnica[]{
    titulo,
    conteudo
  },
  links{
    pdfs[]{
      title,
      "url": file.asset->url
    },
    urls[]{
      title,
      url
    }
  },
  gallery[]{
    ${SIMPLE_IMAGE_FIELDS}
  }
}
`;

/* =========================
   PRESS
========================= */

export const PRESS_QUERY = `
*[_type == "press"] | order(year desc, order desc) {
  _id,
  title,
  year,
  link,
  "pdfUrl": pdf.asset->url,
  placeholderImage{
    ${SIMPLE_IMAGE_FIELDS}
  }
}
`;

/* =========================
   I + D
========================= */

export const IMAISD_PAGE_SETTINGS_QUERY = `
*[_type == "imaisdPageSettings"][0]{
  introText
}
`;

export const IMAISD_INFO_QUERY = `
*[_type == "imaisd"] | order(year desc) {
  _id,
  title,
  "slug": slug.current,
  year,
  tag,
  pdf,
  "pdfUrl": pdf.asset->url,
  coverImage{
    ${SIMPLE_IMAGE_FIELDS}
  },
  coverImage2{
    ${SIMPLE_IMAGE_FIELDS}
  }
}
`;

export const IMAISD_SINGLE_QUERY = `
*[_type == "imaisd"] | order(year desc) {
  _id,
  title,
  description,
  gallery[]{
    image{
      ${SIMPLE_IMAGE_FIELDS}
    },
    title
  }
}
`;
