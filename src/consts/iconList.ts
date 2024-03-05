interface IIconData {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface IIconList {
  href: string;
  icon: IIconData;
}

const iconsList: IIconList[] = [
  {
    href: "#",
    icon: {
      src: "/facebook.svg",
      alt: "facebook",
      width: 9,
      height: 16,
    },
  },
  {
    href: "#",
    icon: {
      src: "/insta.svg",
      alt: "instagram",
      width: 16,
      height: 16,
    },
  },
  {
    href: "#",
    icon: {
      src: "/xwitter.svg",
      alt: "xwitter",
      width: 16,
      height: 13,
    },
  },
  {
    href: "#",
    icon: {
      src: "/youtube.svg",
      alt: "youtube",
      width: 16,
      height: 13,
    },
  },
];

export default iconsList;
