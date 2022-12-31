import { Entity } from "../../../@seedwork/entity/entity";
import { UniqueEntityId } from "../../../@seedwork/domain/value-objects/unique-entity-id";

export interface CategoryProps {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
}

export class Category extends Entity<CategoryProps> {
  constructor(
    private readonly categoryProps: CategoryProps,
    _id?: UniqueEntityId
  ) {
    super(categoryProps, _id);
    this.description = this.categoryProps.description;
    this.categoryProps.is_active = this.categoryProps.is_active ?? true;
    this.categoryProps.created_at = this.categoryProps.created_at ?? new Date();
  }

  get name() {
    return this.categoryProps.name;
  }

  private set name(value: string) {
    this.categoryProps.name = value;
  }

  get description() {
    return this.categoryProps.description;
  }

  private set description(value: string) {
    this.categoryProps.description = value ?? null;
  }

  get is_active() {
    return this.categoryProps.is_active;
  }

  private set is_active(value: boolean) {
    this.categoryProps.is_active = value ?? true;
  }

  get created_at() {
    return this.categoryProps.created_at;
  }

  private set created_at(value: Date) {
    this.categoryProps.created_at = value ?? new Date();
  }

  public update(name: string, description: string): void {
    this.name = name;
    this.description = description;
  }

  public activate(): void {
    this.is_active = true;
  }

  public deactivate(): void {
    this.is_active = false;
  }
}
