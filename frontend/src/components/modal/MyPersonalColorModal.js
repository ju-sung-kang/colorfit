import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { season } from '../../utils/data/season';
import { ContainerDiv, ModalCloseIcon, ResultImage, SubTitleP, MediumTextH, SeasonColor } from '..';
import { MyModalTable } from './MyModalTable';
import { getColorDetailModal } from '../../utils/api/service';

export function MyPersonalColorModal({ toggleClickProps, className, colorId }) {
    const handleToggleClick = () => {
        toggleClickProps();
    };
    console.log(colorId);
    const loggedUser = sessionStorage.getItem('userEmail');

    const [resultColor, setResultColor] = useState('');
    useEffect(async () => {
        if (!loggedUser) {
            return;
        }
        const response = await getColorDetailModal(colorId);
        setResultColor(response);
    }, [colorId]);

    console.log(resultColor);

    const seasonTone = season[resultColor];

    return (
        <ModalDiv className={className}>
            <MyModalTable id={colorId} />
            <ModalCloseIcon clickProps={handleToggleClick} />
            <ResultContainerDiv>
                <ResultImage />
            </ResultContainerDiv>

            <SubTitleP>
                회원님은 <ResultTextS color={resultColor}>봄 웜톤</ResultTextS> 입니다.
            </SubTitleP>

            <ColorContainerDiv>
                <MediumTextLeftH>회원님에게 어울리는 컬러</MediumTextLeftH>
                <SeasonColor season={seasonTone} />
            </ColorContainerDiv>
        </ModalDiv>
    );
}

// styled-components

const ColorContainerDiv = styled(ContainerDiv)`
    background-color: ${({ theme }) => theme.color.white};
    align-items: center;

    width: 640px;

    @media ${({ theme }) => theme.device.mobile} {
        all: unset;

        width: 270px;
        background-color: ${({ theme }) => theme.color.white};
        align-items: center;
        margin-bottom: 8px;
        margin-left: 20px;
        margin-right: 20px;
    }
`;

const ResultContainerDiv = styled(ContainerDiv)`
    background-color: ${({ theme }) => theme.color.white};
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 8px;
    margin-top: 8px;

    @media ${({ theme }) => theme.device.tablet} {
        background-color: ${({ theme }) => theme.color.white};
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 30px;
        margin-top: 20px;
    }

    @media ${({ theme }) => theme.device.mobile} {
        background-color: ${({ theme }) => theme.color.white};
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        margin-bottom: 8px;
        margin-top: 15px;
    }
`;
const ModalDiv = styled(ContainerDiv)`
    display: none;

    &.show {
        overflow-y: auto;
        position: fixed;
        z-index: 9999;
        top: 50%;
        left: 50%;
        height: 80%;
        transform: translate(-50%, -50%);

        width: 100%;
        padding: 50px 30px;

        ${({ theme }) => theme.flexStyled.flexColumn};

        background-color: white;

        border: 1px solid #f3f3f3;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

        ::-webkit-scrollbar {
            width: 10px;
        }

        ::-webkit-scrollbar-track {
            background-color: transparent;
            border-radius: 100px;

            margin: 20px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 100px;
            background-color: #e9e9e9;
            box-shadow: inset 2px 2px 5px 0 rgba(#fff, 0.5);
        }

        @media ${({ theme }) => theme.device.tablet} {
            width: 80%;
        }
    }
`;

const MediumTextLeftH = styled(MediumTextH)`
    margin-top: 120px;
    margin-bottom: 20px;
    margin-left: 30px;
    text-align: left;
    font-size: ${({ theme }) => theme.fontSizes.mediumtext};

    @media ${({ theme }) => theme.device.mobile} {
        margin-top: 30px;
        font-size: ${({ theme }) => theme.fontSizes.mobiletext};
        width: 260px;
        align-items: center;
    }
`;

const ResultTextS = styled.span`
    font-weight: bold;
    color: ${props => `${props.color}`};
`;
