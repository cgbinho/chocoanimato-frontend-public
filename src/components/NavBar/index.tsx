import React, { useState } from 'react';
import Link from 'next/link';

import CartIcon from './CartIcon/index';

import { useAuth } from '../../hooks/auth';

import MobileMenu from '../NavBar/MobileMenu';

import { Container, NavContainer, BurguerContainer } from './styles';

import ProfileButton from './ProfileMenu';
import Button from '../Form/Button';

const NavBar = () => {
  const { user } = useAuth();

  console.log('user?: ', user);

  return (
    <Container>
      <img
        src="/images/chocoanimato_logo.svg"
        alt="Choco Animato Logo"
        height="30px"
      />
      <NavContainer>
        <li>
          <Link href="/">
            <a>Início</a>
          </Link>
        </li>
        <li>
          <Link href="/templates">
            <a>Categorias</a>
          </Link>
        </li>
        <li>
          <Link href="/contact">
            <a>Contato</a>
          </Link>
        </li>
        <li>
          <CartIcon size="24px" />
        </li>
        {!user ? (
          <>
            <li>
              <Link href="/sign-in">
                <a>Entrar</a>
              </Link>
            </li>
            <li>
              <Link href="/sign-up">
                <a>
                  <Button primary>
                    <span>Criar Conta</span>
                  </Button>
                </a>
              </Link>
            </li>
          </>
        ) : (
          <li className="profile">
            <ProfileButton />
          </li>
        )}
      </NavContainer>

      <BurguerContainer>
        <li>
          <MobileMenu />
        </li>
      </BurguerContainer>
    </Container>
  );
};

export default NavBar;
