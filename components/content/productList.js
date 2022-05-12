import { HeartOutline, Heart } from "heroicons-react";
import { Menu, RadioGroup, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import FavoriteButton from "./favoriteButton";
import { useContext } from "react";
import { StoreContext, ACTION_TYPES } from "../../store/store-context";
import AddToCartButton from "./addToCartButton";
import Image from "next/image";

const ProductList = ({ products }) => {
  const { state, dispatch } = useContext(StoreContext);
  // let products = [
  //   {
  //     id: 1,
  //     name: "Earthen Bottle",
  //     href: "#",
  //     price: "$48",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
  //     imageAlt:
  //       "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  //     checked: false,
  //     quantity: 0,
  //   },
  //   {
  //     id: 2,
  //     name: "Nomad Tumbler",
  //     href: "#",
  //     price: "$35",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
  //     imageAlt:
  //       "Olive drab green insulated bottle with flared screw lid and flat top.",
  //     checked: false,
  //     quantity: 0,
  //   },
  //   {
  //     id: 3,
  //     name: "Focus Paper Refill",
  //     href: "#",
  //     price: "$89",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
  //     imageAlt:
  //       "Person using a pen to cross a task off a productivity paper card.",
  //     checked: false,
  //     quantity: 0,
  //   },
  //   {
  //     id: 4,
  //     name: "Machined Mechanical Pencil",
  //     href: "#",
  //     price: "$35",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
  //     imageAlt:
  //       "Hand holding black machined steel mechanical pencil with brass tip and top.",
  //     checked: false,
  //     quantity: 0,
  //   },
  //   {
  //     id: 5,
  //     name: "Earthen Bottle",
  //     href: "#",
  //     price: "$48",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
  //     imageAlt:
  //       "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  //     checked: false,
  //     quantity: 0,
  //   },
  //   {
  //     id: 6,
  //     name: "Nomad Tumbler",
  //     href: "#",
  //     price: "$35",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
  //     imageAlt:
  //       "Olive drab green insulated bottle with flared screw lid and flat top.",
  //     checked: false,
  //     quantity: 0,
  //   },
  //   {
  //     id: 7,
  //     name: "Focus Paper Refill",
  //     href: "#",
  //     price: "$89",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
  //     imageAlt:
  //       "Person using a pen to cross a task off a productivity paper card.",
  //     checked: false,
  //     quantity: 0,
  //   },
  //   {
  //     id: 8,
  //     name: "Machined Mechanical Pencil",
  //     href: "#",
  //     price: "$35",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
  //     imageAlt:
  //       "Hand holding black machined steel mechanical pencil with brass tip and top.",
  //     checked: false,
  //     quantity: 0,
  //   },
  // ];

  return (
    <div className="bg-white">
      <div className="mx-auto py-24 px-6">
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-7 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id}>
              <a className="group cursor-pointer">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <Image
                    src={product.image.url}
                    alt={product.name}
                    height="300"
                    width="320"
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
              </a>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">
                {product.price} lei
              </p>
              <div className="flex justify-between">
                <FavoriteButton product={product} />
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
