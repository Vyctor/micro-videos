import { validate } from "uuid";
import { UniqueEntityId } from "../../../@seedwork/domain/value-objects/unique-entity-id";
import { Category } from "./category";

describe("Category Tests", () => {
  describe("Constructor of category", () => {
    it("should create a category with default values", () => {
      const id = new UniqueEntityId();

      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps, id);

      expect(category).toBeInstanceOf(Category);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie Description");
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.created_at).toEqual(categoryProps.created_at);
      expect(category.id).toBe(id.value);
    });

    it("should create a category with a valid date if created_at is not provided", () => {
      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
      };

      const category = new Category(categoryProps);

      expect(category).toBeInstanceOf(Category);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie Description");
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it("should create a category with is_active true if is_active is not provided", () => {
      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        created_at: new Date(),
      };

      const category = new Category(categoryProps);

      expect(category).toBeInstanceOf(Category);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie Description");
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it("should create a category with description null if no description is provided", () => {
      const categoryProps = {
        name: "Movie",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps);

      expect(category).toBeInstanceOf(Category);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
    });

    it("should create a category with valid id if no id is provided", () => {
      const categoryProps = {
        name: "Movie",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps);

      expect(category).toBeInstanceOf(Category);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.id).toBeTruthy();
      expect(category.id).not.toBeNull();
    });
  });

  describe("Category Getters", () => {
    it("should get id", () => {
      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps);

      expect(category.id).toBeTruthy();
      expect(category.id).not.toBeNull();
      expect(validate(category.id)).toBe(true);
    });

    it("should get category name", () => {
      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps);

      expect(category.name).toBe(categoryProps.name);
    });

    it("should get category description", () => {
      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps);

      expect(category.description).toBe(categoryProps.description);
    });

    it("should get category is_active", () => {
      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps);

      expect(category.is_active).toBe(categoryProps.is_active);
    });

    it("should get category created_at", () => {
      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps);

      expect(category.created_at).toBe(categoryProps.created_at);
    });
  });

  describe("Category Setters", () => {
    it("should set category name", () => {
      const nameBefore = "Movie";
      const nameAfter = "Movie 2";
      const categoryProps = {
        name: nameBefore,
        description: "Movie Description",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps);

      expect(category.name).toBe(nameBefore);

      category["name"] = nameAfter;

      expect(category.name).toBe(nameAfter);
    });

    it("should set category description", () => {
      const descriptionBefore = "Movie Description";
      const descriptionAfter = "Movie Description 2";
      const categoryProps = {
        name: "Movie",
        description: descriptionBefore,
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps);
      expect(category.description).toBe(descriptionBefore);

      category["description"] = descriptionAfter;
      expect(category.description).toBe(descriptionAfter);
    });

    it("should set category is_active", () => {
      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps);

      category["is_active"] = false;

      expect(category.is_active).toBe(false);
    });

    it("should set category created_at", () => {
      const dateBefore = new Date();

      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
        created_at: dateBefore,
      };

      const category = new Category(categoryProps);

      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.created_at).toBe(dateBefore);

      const dateAfter = new Date();

      category["created_at"] = dateAfter;

      expect(category.created_at).toBeInstanceOf(Date);
      expect(category.created_at).toBe(dateAfter);
      expect(category.created_at).not.toBe(dateBefore);
    });

    it("should set category is_active true if value is not provided", () => {
      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
      };

      const category = new Category(categoryProps);

      category["is_active"] = undefined;

      expect(category.is_active).toBe(true);
    });

    it("should set category created_at with a valid date if created_at is not provided", () => {
      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
      };

      const category = new Category(categoryProps);

      expect(category.created_at).toBeInstanceOf(Date);

      category["created_at"] = undefined;
      expect(category.created_at).toBeInstanceOf(Date);
    });
  });

  describe("Category Methods", () => {
    it("should be able to update a category", () => {
      const id = new UniqueEntityId();

      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps, id);

      expect(category.name).toBe(categoryProps.name);
      expect(category.description).toBe(categoryProps.description);

      const categoryPropsUpdated = {
        name: "Movie 2",
        description: "Movie Description 2",
      };

      category.update(
        categoryPropsUpdated.name,
        categoryPropsUpdated.description
      );

      expect(category.name).toBe(categoryPropsUpdated.name);
      expect(category.description).toBe(categoryPropsUpdated.description);
    });

    it("should be able to activate a category", () => {
      const id = new UniqueEntityId();

      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: false,
        created_at: new Date(),
      };

      const category = new Category(categoryProps, id);

      expect(category.is_active).toBe(false);

      category.activate();

      expect(category.is_active).toBe(true);
    });

    it("should be able to deactivate a category", () => {
      const id = new UniqueEntityId();

      const categoryProps = {
        name: "Movie",
        description: "Movie Description",
        is_active: true,
        created_at: new Date(),
      };

      const category = new Category(categoryProps, id);

      expect(category.is_active).toBe(true);

      category.deactivate();

      expect(category.is_active).toBe(false);
    });
  });
});
