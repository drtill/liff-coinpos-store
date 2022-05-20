import React, { useState, useMemo, createContext } from 'react';

// create context
export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [categoryDrawerOpen, setCategoryDrawerOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);

  const toggleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen);
  const closeCartDrawer = () => setCartDrawerOpen(false);

  const toggleCategoryDrawer = () => setCategoryDrawerOpen(!categoryDrawerOpen);
  const closeCategoryDrawer = () => setCategoryDrawerOpen(false);

  const toggleUserModal = () => setUserModalOpen(!isUserModalOpen);
  const closeUserModal = () => setUserModalOpen(false);
  
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const closeModal = () => setIsModalOpen(false);

  const value = useMemo(
    () => ({
      cartDrawerOpen,
      toggleCartDrawer,
      closeCartDrawer,
      setCartDrawerOpen,
      categoryDrawerOpen,
      toggleCategoryDrawer,
      closeCategoryDrawer,
      isModalOpen,
      toggleModal,
      closeModal,
      isUserModalOpen,
      toggleUserModal,
      closeUserModal
    }),

    [cartDrawerOpen, categoryDrawerOpen, isModalOpen]
  );

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  );
};
