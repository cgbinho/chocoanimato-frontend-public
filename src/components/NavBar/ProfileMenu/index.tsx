import React, { useState } from 'react';
import Link from 'next/link';
import { FaCaretDown } from 'react-icons/fa';
import { FiLogOut, FiEdit3 } from 'react-icons/fi';
import { RiVideoChatLine } from 'react-icons/ri';
import { BiShoppingBag, BiUser } from 'react-icons/bi';

import {
  DropdownContainer,
  DropdownMenuContainer,
  DropdownItemContainer
} from './styles';

import { ProfileButton } from './styles';
import { useAuth } from '../../../hooks/auth';

export const ProfileMenu = () => {
  const [hidden, setHidden] = useState(true);

  const { user, signOut } = useAuth();

  return (
    <DropdownContainer>
      <ProfileButton primary onClick={() => setHidden(!hidden)}>
        <BiUser size={24} />
        <FaCaretDown size={14} />
      </ProfileButton>
      <DropdownMenuContainer
        right
        hidden={hidden}
        toggle={() => setHidden(!hidden)}
      >
        <DropDownItem label="Editar Perfil" icon={FiEdit3} link="/profile" />
        <DropDownItem
          label="Projetos"
          icon={RiVideoChatLine}
          link="/projects"
        />
        <DropDownItem label="Pedidos" icon={BiShoppingBag} link="/orders" />
        <hr />
        <DropDownItem
          label="Sair"
          icon={FiLogOut}
          link="/"
          onClick={() => signOut}
        />
      </DropdownMenuContainer>
    </DropdownContainer>
  );
};

interface IDropDownProps {
  link: string;
  icon: any;
  label: string;
  onClick?: () => void;
}
const DropDownItem = ({ link, icon: Icon, label, onClick }: IDropDownProps) => {
  return (
    <DropdownItemContainer>
      <Link href={link}>
        <a onClick={onClick}>
          {<Icon size={22} />}
          {label}
        </a>
      </Link>
    </DropdownItemContainer>
  );
};

export default ProfileMenu;
