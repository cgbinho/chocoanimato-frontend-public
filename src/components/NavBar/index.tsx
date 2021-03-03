import Link from 'next/link';
import React from 'react';
import { useAuth } from '../../hooks/auth';
import MobileMenu from '../NavBar/MobileMenu';
import ProfileButton from './ProfileMenu';
import { BurguerContainer, Container, NavContainer } from './styles';

const NavBar = () => {
  const { user } = useAuth();

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
          <Link href="/contact">
            <a>Contato</a>
          </Link>
        </li>
        {!user ? (
          <>
            <li>
              <Link href="/sign-in">
                <a>Entrar</a>
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
