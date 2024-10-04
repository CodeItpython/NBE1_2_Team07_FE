import InputBox from "../../../components/InputBox";
import {ChangeEvent, KeyboardEvent, useRef, useState} from "react";
import './style.css';
import {useNavigate} from "react-router-dom";
import {SignInRequestDto} from "../../../apis/request/auth";
import {signInRequest, SNS_SIGN_IN_URL} from "../../../apis";
import {SignInResponseDto} from "../../../apis/response/auth";
import {ResponseBody} from "../../../types";
import {ResponseCode} from "../../../types/enums";
import {useCookies} from "react-cookie";

export default function SignIn() {

    const idRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);

    const [cookie, setCookie] = useCookies();


    const [id, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [message, setMessage] = useState<string>('');

    const navigate = useNavigate();

    const signInResponse = (responseBody: ResponseBody<SignInResponseDto>) => {
        if (!responseBody) return;

        const {code} = responseBody;
        if (code === ResponseCode.VALIDATION_FAIL) alert('입력하신 정보가 올바르지 않습니다.');
        if (code === ResponseCode.SIGN_IN_FAIL) setMessage('로그인 정보가 일치 X');
        if (code === ResponseCode.DATABASE_ERROR) alert('데이터베이스 에러');
        if (code !== ResponseCode.SUCCESS) return;

        const {token, expirationTime, role} = responseBody as SignInResponseDto;
        const now = new Date().getTime() * 1000;
        const expires = new Date(now + expirationTime);

        setCookie('accessToken', token, {expires, path: '/'});

        role === 'ROLE_ADMIN' ? navigate('/admin') : navigate('/user'); //이후작업시 어디로 navigate할지에 대한 프로토타입
    };


    const onIdChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setId(value);
        setMessage('');
    };

    const onPasswordChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const {value} = event.target;
        setPassword(value);
        setMessage('');
    };

    const onSignUpButtonClickHandler = () => {
        navigate('/auth/sign-up');
    };

    const onSignInButtonClickHandler = () => {
        if (!id || !password) {
            alert('아이디와 비밀번호를 입력하세요!');
            return;
        }
        const requestBody: SignInRequestDto = {id, password};
        signInRequest(requestBody).then(signInResponse)
    };

    const onSnsSignInButtonClickHandler = (type: 'kakao' | 'naver') => {
        window.location.href = SNS_SIGN_IN_URL(type);
    }

    const onIdKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if (!passwordRef.current) return;
        passwordRef.current.focus();
    };

    const onPasswordKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onSignInButtonClickHandler();
    };


    return (
        <div id='sign-in-wrapper'>
            <div className='sign-in-container'>
                <div className='sign-in-box'>
                    <div className='sign-in-title'>{'develetter 서비스'}</div>
                    <div className='sign-in-content-box'>
                        <div className='sign-in-content-input-box'>
                            <InputBox ref={idRef} title='아이디' placeholder='아이디를 입력해주세요' type='text' value={id}
                                      onChange={onIdChangeHandler}
                                      onKeyDown={onIdKeyDownHandler}/>
                            <InputBox ref={passwordRef} title='비밀번호' placeholder='비밀번호를 입력해주세요' type='password'
                                      value={password} onChange={onPasswordChangeHandler}
                                      isErrorMessage message={message}
                                      onKeyDown={onPasswordKeyDownHandler}/>
                        </div>
                        <div className='sign-in-content-button-box'>
                            <div className='primary-button-lg full-width'
                                 onClick={onSignInButtonClickHandler}>{'로그인'}</div>
                            <div className='second-primary-button-lg full-width' onClick={onSignUpButtonClickHandler}>{'회원가입'}</div>
                        </div>
                        <div className='sign-in-content-divider'></div>
                        <div className='sign-in-content-sns-sign-in-box'>
                            <div className='sign-in-content-sns-sign-in-title'>{'SNS 로그인'}</div>
                            <div className='sign-in-content-sns-sign-in-button-box'>
                                <div className='kakao-sign-in-button'
                                     onClick={() => onSnsSignInButtonClickHandler('kakao')}></div>
                                <div className='naver-sign-in-button'
                                     onClick={() => onSnsSignInButtonClickHandler('naver')}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};