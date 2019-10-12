import React from "react";
import styled from '@emotion/styled';
import tw from 'tailwind.macro';

const HeaderWrapper = styled('div')`
    ${tw`h-20 p-4 text-4xl text-white font-bold`};
`;

const Header: React.FC = () => <HeaderWrapper>Header</HeaderWrapper>;

export default Header;
