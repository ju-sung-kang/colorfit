/* eslint-disable import/named */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/tabindex-no-positive */
/* eslint-disable jsx-a11y/label-has-associated-control */

import { useState, useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ContainerDiv, Fashion, MediumTextH, WhiteButton, RadioTextH, MyPersonalListModal } from '../../components';
import { fashionPageState, toneChoiceState } from '../../utils/data/atom';
import { setScrollDisabled } from '../../utils/data/setScrollDisabled';

function PersonalColorChoice() {
    // 리스트 보기 모달
    const [listModal, setListModal] = useState(false);

    // 리스트에서 받아온 컬러 선택값
    const [myPersonalColor, setMyPersonalColor] = useState('선택안함');

    // Radio Button Select
    const [select, setSelect] = useState('');
    const handleSelectChange = event => {
        const { value } = event.target;
        console.log(value);
        setSelect(value);
    };

    // Next Page로 넘기기
    const setFashionPage = useSetRecoilState(fashionPageState);

    // 기본 퍼스널 컬러 선택시 값 저장
    const [toneValue, setToneValue] = useRecoilState(toneChoiceState);
    const onChangeSelect = e => {
        const tone = e.target.value;
        setToneValue(tone);
        if (select === 'basic') {
            sessionStorage.setItem('color', tone);
        }
    };

    // 컬러 페이지 검사 결과 받아오기 & 세션 스토리지에 넣기
    const seasonTone = sessionStorage.getItem('season');
    const season = {
        SP: '봄 웜톤',
        SU: '여름 쿨톤',
        AU: '가을 웜톤',
        WI: '겨울 쿨톤',
    };

    // 마이퍼스널 컬러 선택 모달
    const [personalModal, setPersonalModal] = useState(false);

    const checkedColor = () => {
        if (seasonTone) {
            if (select === 'previous') {
                sessionStorage.setItem('color', seasonTone);
            }
            if (seasonTone === 'SP') {
                return season.SP;
            }
            if (seasonTone === 'SU') {
                return season.SU;
            }
            if (seasonTone === 'AU') {
                return season.AU;
            }
            if (seasonTone === 'WI') {
                return season.WI;
            }
        }
        return `직전에 분석한 자료가 없습니다.`;
    };

    const checkedColorText = checkedColor();

    // 불러오기 클릭 시 모달 토글 함수 + 선택한 마이퍼스널컬러 가져오기
    const handleToggleClick = chosenColor => {
        console.log(chosenColor);
        setListModal(current => !current);
        setMyPersonalColor(chosenColor.chosen);
    };

    return (
        <>
            <MyPersonalListModal className={listModal && 'show'} toggleClickProps={handleToggleClick} />
            <Fashion />

            <MediumTextH>매칭하고싶은 퍼스널 컬러를 아래 3가지 방법 중 선택해주세요.</MediumTextH>

            <ChoiceContainerDiv>
                <div>
                    <Item>
                        <RadioButton
                            type="radio"
                            name="radio"
                            value="basic"
                            checked={select === 'basic'}
                            onChange={event => handleSelectChange(event)}
                        />
                        <RadioButtonLabel />
                        <RadioTextH>기본 퍼스널 컬러</RadioTextH>
                    </Item>
                    <TextH3>
                        기본으로 지정된 봄 웜톤 / 여름 쿨톤 / 가을 웜톤 / 겨울 쿨톤 중 선택 1 정확도가 떨어질 수
                        있습니다.
                    </TextH3>
                </div>
                <div>
                    <SelectDiv>
                        <select
                            name="personalcolor"
                            className="select"
                            value={toneValue}
                            disabled={select !== 'basic'}
                            onChange={onChangeSelect}
                        >
                            <option value="SP">봄 웜톤</option>
                            <option value="SU">여름 쿨톤</option>
                            <option value="AU">가을 웜톤</option>
                            <option value="WI">겨울 쿨톤</option>
                        </select>
                    </SelectDiv>
                </div>
                <div>
                    <Item>
                        <RadioButton
                            type="radio"
                            name="radio"
                            value="previous"
                            checked={select === 'previous'}
                            onChange={event => handleSelectChange(event)}
                        />
                        <RadioButtonLabel />
                        <RadioTextH>직전에 분석한 퍼스널 컬러</RadioTextH>
                    </Item>
                    <TextH3>퍼스널 컬러 결과 페이지에서 ‘패션 매칭하기’ 버튼을 클릭해야 합니다.</TextH3>
                </div>
                <div>
                    <ResultText>{checkedColorText}</ResultText>
                </div>
                <div>
                    <Item>
                        <RadioButton
                            type="radio"
                            name="radio"
                            value="my"
                            checked={select === 'my'}
                            onChange={event => handleSelectChange(event)}
                        />
                        <RadioButtonLabel />
                        <RadioTextH>마이 퍼스널 컬러</RadioTextH>
                    </Item>
                    <TextH3>로그인 유저는 기존에 저장한 퍼스널 컬러로 매칭할 수 있습니다.</TextH3>
                </div>
                <div>
                    <MyPersonalColorDiv>
                        <ResultText>{myPersonalColor}</ResultText>
                        <CustomButton
                            disabled={select !== 'my'}
                            onClick={() => {
                                handleToggleClick();
                            }}
                        >
                            불러오기
                        </CustomButton>
                    </MyPersonalColorDiv>
                </div>
            </ChoiceContainerDiv>

            <ButtonContainerDiv>
                <WhiteButton type="submit" onClick={() => setFashionPage(1)}>
                    다음으로
                </WhiteButton>
            </ButtonContainerDiv>
        </>
    );
}

export { PersonalColorChoice };

const ChoiceContainerDiv = styled(ContainerDiv)`
    background-color: ${({ theme }) => theme.color.white};
    width: 850px;
    height: 450px;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    align-items: left;
    margin-bottom: 50px;
    margin-top: 120px;

    @media ${({ theme }) => theme.device.mobile} {
        all: unset;

        width: 270px;
        height: 400px;
        position: relative;
        background-color: ${({ theme }) => theme.color.white};
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 40px;
        margin-left: 60px;
    }
`;

const Item = styled.div`
    display: flex;
    align-items: center;
    height: 48px;
    position: relative;

    @media ${({ theme }) => theme.device.mobile} {
        all: unset;

        display: flex;
        align-items: center;
        height: 30px;
        position: relative;
    }
`;

const RadioButtonLabel = styled.label`
    position: absolute;
    top: 25%;
    left: 4px;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: white;
    border: 1px solid #bebebe;

    @media ${({ theme }) => theme.device.mobile} {
        all: unset;

        position: absolute;
        top: 25%;
        left: 4px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: white;
        border: 1px solid #bebebe;
    }
`;

const RadioButton = styled.input`
    opacity: 0;
    z-index: 1;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    margin-right: 10px;
    &:hover ~ ${RadioButtonLabel} {
        background: #bebebe;
        &::after {
            content: '';
            display: block;
            border-radius: 50%;
            width: 12px;
            height: 12px;
            margin: 6px;
            background: white;
        }
    }
    ${props =>
        props.checked &&
        ` 
    &:checked + ${RadioButtonLabel} {
      background: white;
      border: 1px solid #3C64B1;
      &::after {
        content: "";
        display: block;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        margin: 5px;
        box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
        background: #3C64B1;
      }
    }
  `}
    @media ${({ theme }) => theme.device.mobile} {
        all: unset;

        opacity: 0;
        z-index: 1;
        border-radius: 50%;
        width: 6px;
        height: 6px;
        margin-right: 10px;
        &:hover ~ ${RadioButtonLabel} {
            background: white;
            &::after {
                content: '';
                display: block;
                border-radius: 50%;
                width: 6px;
                height: 6px;
                margin: 3px;
                background: white;
            }
        }
        ${props =>
            props.checked &&
            ` 
        &:checked + ${RadioButtonLabel} {
          background: white;
          border: 1px solid #3C64B1;
          &::after {
            content: "";
            display: block;
            border-radius: 50%;
            width: 6px;
            height: 6px;
            margin: 3px;
            box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.1);
            background: #3C64B1;
          }
        }
      `}
    }
`;

const SelectDiv = styled.div`
    @media ${({ theme }) => theme.device.mobile} {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    .select {
        @media ${({ theme }) => theme.device.mobile} {
            margin-top: 20px;
            width: 80px;
            height: 20px;
            padding-left: 5px;
            font-size: ${({ theme }) => theme.fontSizes.mobiletext};
            font-weight: bold;
            border: 2px solid #333;
            background-color: #fff;
            border-radius: 3px;
        }
        margin-top: 30px;
        margin-bottom: 20px;
        width: 130px;
        height: 30px;
        padding-left: 25px;
        font-size: 0.75rem;
        border: 2px solid #373f41;
        background-color: #fff;
        border-radius: 3px;
        font-weight: 1000;
    }

    .select:focus {
        border-color: #c4c4c4;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    color: ${({ theme }) => theme.color.white};
    background-color: ${props => props.theme.color.white};
`;

const MyPersonalColorDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    vertical-align: middle;

    margin-left: 28px;
    margin-right: 28px;
    color: ${({ theme }) => theme.color.white};
    background-color: ${props => props.theme.color.white};

    @media ${({ theme }) => theme.device.mobile} {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: left;
    }
`;

const ButtonContainerDiv = styled(ContainerDiv)`
    @media ${({ theme }) => theme.device.mobile} {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        vertical-align: middle;
        margin-top: 50px;
    }

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 50px;
    padding-bottom: 100px;
`;

const TextH3 = styled.h3`
    @media ${({ theme }) => theme.device.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.mobiletext};
        font-weight: bold;
        align-items: left;

        margin-left: 30px;
        color: ${({ theme }) => theme.color.darkgray};
    }

    margin-left: 50px;

    font-size: ${({ theme }) => theme.fontSizes.smalltext};
    align-items: left;
    color: ${({ theme }) => theme.color.darkgray};
`;

const CustomButton = styled.button`
    @media ${({ theme }) => theme.device.mobile} {
        font-size: 0.7em;
        background-color: #2c2c2c;
        padding: 5px 15px;
        border-radius: 8px;
        color: white;
        transition: all 150ms ease;
        cursor: pointer;
        border: none;
    }
    font-size: 1rem;
    background-color: #2c2c2c;
    padding: 5px 25px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    border: none;
`;

const ResultText = styled.h2`
    @media ${({ theme }) => theme.device.mobile} {
        font-size: ${({ theme }) => theme.fontSizes.smalltext};
        font-weight: bold;
        color: black;
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;
        vertical-align: middle;
    }
    font-size: 1rem;
    font-weight: bold;
    margin-top: 40px;
    margin-bottom: 50px;
    text-align: center;
    vertical-align: middle;
    color: ${({ theme }) => theme.color.white};
    background-color: ${props => props.theme.color.white};
`;
