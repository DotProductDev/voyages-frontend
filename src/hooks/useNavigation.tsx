import { useNavigate } from 'react-router-dom';
import { ACCOUNTS, CONTRIBUTE } from '@/share/CONST_DATA';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/getAuthUserSlice';
import { RootState } from '@/redux/store';

interface UseNavigationReturn {
    handleClickGuidelines: () => void;
    handleSignInClick: () => void;
    handleSignUpClick: () => void;
    handleResetPasswordClick: () => void;
    handleLogout: () => void;
    handleConfirmSignOut: () => void
    handleAcceptTeams: () => void
}

export const useNavigation = (): UseNavigationReturn => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleNavigate = (path: string) => {
        navigate(path);
    };

    const handleClickGuidelines = () => handleNavigate(`/${CONTRIBUTE}guidelines`);
    const handleSignInClick = () => handleNavigate(`/${ACCOUNTS}signin`);
    const handleSignUpClick = () => handleNavigate(`/${ACCOUNTS}signup`);
    const handleResetPasswordClick = () => handleNavigate(`/${ACCOUNTS}password/reset`);
    const handleAcceptTeams = () => handleNavigate(`/${CONTRIBUTE}`);

    const handleLogout = () => {
        handleNavigate(`/${ACCOUNTS}logout`);
    };
    const handleConfirmSignOut = () => {
        dispatch(logout());
        handleNavigate(`/`);
    }

    return {
        handleClickGuidelines,
        handleSignInClick,
        handleSignUpClick,
        handleResetPasswordClick,
        handleLogout, handleConfirmSignOut, handleAcceptTeams
    };
};
