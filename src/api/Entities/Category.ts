import { CategoryType } from "../Interfaces/CategorySchema"

export class Category {
    private props: CategoryType

    constructor(category: CategoryType) {
        this.props = category
    }

    get id() {
        return this.props.id
    }

    get name() {
        return this.props.name
    }

    get url() {
        return this.props.url;
    }

    get icon() {
        return this.props.icon
    }

    toObject() {
        return {
            id: this.id,
            name: this.name,
            url: this.url,
            icon: this.icon
        }
    }
}