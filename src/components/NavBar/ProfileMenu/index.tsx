import Link from 'next/link';
import React, { useState } from 'react';
import { BiShoppingBag, BiUser } from 'react-icons/bi';
import { FaCaretDown } from 'react-icons/fa';
import { FiEdit3, FiLogOut } from 'react-icons/fi';
import { RiVideoChatLine } from 'react-icons/ri';
import { useAuth } from '../../../hooks/auth';
import {
  DropdownContainer,
  DropdownItemContainer,
  DropdownMenuContainer,
  ProfileButton
} from './styles';

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
