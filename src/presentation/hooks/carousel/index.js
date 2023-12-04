const useCarousel = (items) => {
    const moveBackward = (current) => {
        if (current) {
            const position = items.indexOf(current);
            if (position - 1 > -1) {
                return items[position - 1];
            }
        }
        return items[items.length - 1];
    }

    const moveForward = (current) => {
        if (current) {
            const position = items.indexOf(current);
            if (position + 1 < items.length) {
                return items[position + 1];
            }
        }
        return items[0];
    }

    return {
        moveForward,
        moveBackward,
    }
};

export {
    useCarousel,
};
