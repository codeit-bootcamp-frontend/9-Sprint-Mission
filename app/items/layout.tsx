import NavBar from "@/components/navBar/NavBar";

const ItemsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NavBar>
      {children}
    </NavBar>
  );
}

export default ItemsLayout;