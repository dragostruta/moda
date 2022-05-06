import { Heart, HeartOutline } from "heroicons-react";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { StoreContext, ACTION_TYPES } from "../../store/store-context";

const FavoriteButton = ({ product }) => {
  const { state, dispatch } = useContext(StoreContext);
  const [isChecked, setIsChecked] = useState(false);

  const addToFav = (product) => {
    dispatch({
      type: ACTION_TYPES.SET_FAVORITE_ITEMS,
      payload: { favoriteItems: state.favoriteItems.concat(product) },
    });
  };

  const removeFromFav = (product) => {
    let list = state.favoriteItems.filter((data) => data.id !== product.id);
    dispatch({
      type: ACTION_TYPES.SET_FAVORITE_ITEMS,
      payload: { favoriteItems: list },
    });
  };

  return (
    <div className="cursor-pointer">
      {isChecked ? (
        <Heart
          onClick={() => {
            setIsChecked(false);
            removeFromFav(product);
          }}
        />
      ) : (
        <HeartOutline
          onClick={() => {
            setIsChecked(true);
            addToFav(product);
          }}
        />
      )}
    </div>
  );
};

export default FavoriteButton;
