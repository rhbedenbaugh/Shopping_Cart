import { Offcanvas as Canvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
// import { CartItem } from "./CartItem";
import { StoreItem } from "./StoreItem";
import storeItems from "../data/items.json"


type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart()
  return (
    <Canvas show={isOpen} onHide={closeCart} placement="end">
      <Canvas.Header closeButton>
        <Canvas.Title>Cart</Canvas.Title>
      </Canvas.Header>
      <Canvas.Body>
        <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />))}
          <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(cartItems.reduce((total, cartItem) => {
              const item = storeItems.find(i => i.id === cartItem.id)
              return total + (item?.price || 0) * cartItem.quantity
            }, 0)
            )}
          </div>
        </Stack>
      </Canvas.Body>
    </Canvas>
  )
}