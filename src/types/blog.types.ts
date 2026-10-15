export type BlogPost = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  date: string;
  readingTime: string;
  href?: string;
};

export type BlogCardProps = {
  post: BlogPost;
};

export type BlogProps = {
  posts?: BlogPost[];
};
