type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  hasPrime: boolean;
  rating: {
    rate: number;
    count: number;
  };
};
