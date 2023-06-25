import { v4 as createUuid } from 'uuid';

export class Task {
  private _id: string;

  constructor(private _detail: string, private _description: string) {
    this._id = createUuid();
    this._detail = _detail;
    this._description = _description;
  }

  public get id() {
    return this._id;
  }

  public set detail(detail: string) {
    this._detail = detail;
  }

  public set description(description: string) {
    this._description = description;
  }

  public toJson() {
    return {
      id: this._id,
      detail: this._detail,
      description: this._description,
    };
  }
}
