import { Card, Text } from '@chakra-ui/react';

interface MenuCardProps {
	menuItem: string
}

const MenuCard = ({ menuItem }: MenuCardProps) => {
	return (

		<Card.Root size="sm">
			<Card.Body color="fg.muted" p={2}>
				<Text fontWeight="bold" fontSize="md">
					{menuItem}
				</Text>
			</Card.Body>
		</Card.Root>
	);
};

export default MenuCard;

