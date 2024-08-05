import { Router } from "express";
import { CreateCategoryController } from "../../Controller/Category/CreateCategoryController";
import { PrismaCategoryRepository } from "../../Repositories/Prisma/PrismaCategoryRepository";
import { CreateCategories } from "../../Service/Category/CreateCategories";
import { ListCategories } from "../../Service/Category/ListCategories";
import { ListCategoryController } from "../../Controller/Category/ListCategoryController";
import { DeleteCategoryController } from "../../Controller/Category/DeleteCategoryController";
import { DeleteCategories } from "../../Service/Category/DeleteCategories";
import { EditCategoryController } from "../../Controller/Category/EditCategoryController";
import { EditCategory } from "../../Service/Category/EditCategory";
import { CATEGORY } from "../../Endpoints/endpoints";

interface ControllerProps {
    createCategoryController: CreateCategoryController,
    listCategoryController: ListCategoryController,
    deleteCategoryController: DeleteCategoryController,
    editCategoryController: EditCategoryController
}

export class CategoryRoute {
    private controllers: ControllerProps;

    constructor() {
        const prismaCategoryRepository = new PrismaCategoryRepository();

        const createCategories = new CreateCategories(prismaCategoryRepository)
        const listCategory = new ListCategories(prismaCategoryRepository)
        const deleteCategory = new DeleteCategories(prismaCategoryRepository);
        const editCategory = new EditCategory(prismaCategoryRepository)

        const createCategoryController = new CreateCategoryController(createCategories)
        const listCategoryController = new ListCategoryController(listCategory)
        const deleteCategoryController = new DeleteCategoryController(deleteCategory);
        const editCategoryController = new EditCategoryController(editCategory)

        this.controllers = {
            createCategoryController,
            listCategoryController,
            deleteCategoryController,
            editCategoryController
        }
    }

    setRoute(router: Router) {
        const {
            createCategoryController,
            listCategoryController,
            deleteCategoryController,
            editCategoryController
        } = this.controllers

        router.get(CATEGORY, (req, res) => listCategoryController.handle(req, res))
        router.post(CATEGORY, (req, res) => createCategoryController.handle(req, res))
        router.put(CATEGORY, (req, res) => editCategoryController.handle(req, res))
        router.delete(CATEGORY, (req, res) => deleteCategoryController.handle(req, res))
    }
}