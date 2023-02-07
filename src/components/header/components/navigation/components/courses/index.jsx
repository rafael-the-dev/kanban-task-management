import { v4 as uuidV4 } from "uuid"
import ListItem from "../list-item"

const Container = () => {
    const list = [
        {
            icon: <></>,
            id: uuidV4(),
            href: "/subjects",
            label: "Subjects",
        },
    ];

    return (
        <ul>
            {
                list.map(item => (
                    <ListItem
                        { ...item }
                        key={item.id}
                    />
                ))
            }
        </ul>
    );
};

export default Container;