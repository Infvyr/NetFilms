import {
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function VideoPage() {
	const router = useRouter();

	const onModalClose = () => router.back();

	return (
		<>
			<h1>Video {router.query.videoId}</h1>
			<Modal
				onClose={onModalClose}
				size="6xl"
				isOpen="true"
				isCentered
				autoFocus={false}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Watch video {router.query.videoId}</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum
						exercitationem nostrum expedita sint dolorum molestias dolores
						quaerat est voluptas obcaecati tempore numquam ab minus repellat
						aliquid, velit explicabo nihil? Commodi.
					</ModalBody>
					<ModalFooter>
						<Button onClick={onModalClose}>Close</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
