import { toast } from "react-hot-toast";
import { LoginScreen } from "@/components/login-screen";

export default function LoginPage() {
	return (
		<LoginScreen
			onSuccessToast={(message) => {
				toast.success(message);
			}}
		/>
	);
}
