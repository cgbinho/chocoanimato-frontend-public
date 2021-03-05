import React, { useState, useRef } from 'react';

import Hamburger from '../Hamburguer';
import { StyledMenu, StyledLink, StyledButton } from './styles';

import { useOnClickOutside } from '../../../hooks/utils/clickoutside';
import Link from 'next/link';
import { useAuth } from '../../../hooks/auth';
import { FiUserCheck } from 'react-icons/fi';

const MobileMenu = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const close = () => setOpen(false);

  useOnClickOutside(node, () => setOpen(false));

  const CredentialsMenu = () => {
    return (
      <>
        <Link href="/sign-in" passHref>
          <StyledLink onClick={() => close()}>Entrar</StyledLink>
        </Link>
        <Link href="/sign-up" passHref>
          <StyledLink onClick={() => close()}>
            <StyledButton primary>Criar Conta</StyledButton>
          </StyledLink>
        </Link>
      </>
    );
  };

  const LoggedMenu = () => {
    return (
      <>
        <hr />
        <Link href="/profile" passHref>
          <StyledLink onClick={() => close()}>Editar Perfil</StyledLink>
        </Link>
        <Link href="/projects" passHref>
          <StyledLink onClick={() => close()}>Projetos</StyledLink>
        </Link>
        <Link href="/checkout" passHref>
          <StyledLink onClick={() => close()}>Carrinho</StyledLink>
        </Link>
        <Link href="/orders" passHref>
          <StyledLink onClick={() => close()}>Pedidos</StyledLink>
        </Link>
        <hr />
        <Link href="/" passHref>
          <StyledLink
            onClick={() => {
              close(), signOut();
            }}
          >
            Sair
          </StyledLink>
        </Link>
      </>
    );
  };

  return (
    <div ref={node}>
      <StyledMenu open={open}>
        {user && (
          <>
            <div className="logged_indicator">
              <Link href="/profile">
                <a>
                  <FiUserCheck size="28px" />
                  <p>{user.email}</p>
                </a>
              </Link>
            </div>
            <hr />
          </>
        )}
        <Link href="/" passHref>
          <StyledLink onClick={() => close()}>Início</StyledLink>
        </Link>
        {!user && <CredentialsMenu />}
        <Link href="/templates" passHref>
          <StyledLink onClick={() => close()}>Categorias</StyledLink>
        </Link>
        <Link href="/contact" passHref>
          <StyledLink onClick={() => close()}>Contato</StyledLink>
        </Link>
        {user && <LoggedMenu />}
      </StyledMenu>
      <Hamburger open={open} setOpen={setOpen} />
    </div>
  );
};

export default MobileMenu;
