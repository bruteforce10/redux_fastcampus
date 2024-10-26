import { SignedInPage } from "@/components/guard/SignedInPage";

const CartPage = () => {
  return (
    <SignedInPage>
      <div className="min-h-[80vh] max-w-screen-md mx-auto px-4 mt-8">
        Cart Page
      </div>
    </SignedInPage>
  );
};

export default CartPage;
