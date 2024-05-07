import Button from '@/components/ui/Button';
import { FC } from 'react';

interface pageProps {}
const page: FC<pageProps> = ({}) => {
	return (
		<Button
			className=''
			isLoading={true}>
			page
		</Button>
	);
};

export default page;
