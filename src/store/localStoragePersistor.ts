import { Ref, ref } from "vue";

export default class DYSStore {
  static backlog: Ref<Item[]> = ref([]);
  static doing: Ref<Item[]> = ref([]);
  static done: Ref<Item[]> = ref([]);
  static nextID = ref(0);

  static loadData() {
    const backlog = localStorage.getItem("backlog");
    const doing = localStorage.getItem("doing");
    const done = localStorage.getItem("done");
    if (backlog) this.backlog.value = JSON.parse(backlog);
    if (doing) this.doing.value = JSON.parse(doing);
    if (done) this.done.value = JSON.parse(done);

    this.nextID.value =
      Math.max(
        ...this.backlog.value.map((e) => e.id),
        ...this.doing.value.map((e) => e.id),
        ...this.done.value.map((e) => e.id),
        this.nextID.value
      ) + 1;
    this.sortAllByPriority();
  }

  static addItem(
    title: string,
    description: string,
    priority: PRIORITY,
    state: ItemState
  ) {
    const item = new Item();
    item.title = title;
    item.description = description;
    item.priority = priority;
    item.id = this.nextID.value;
    if (state == ItemState.BACKLOG) this.backlog.value.push(item);
    else if (state == ItemState.DOING) this.doing.value.push(item);
    else if (state == ItemState.DONE) this.done.value.push(item);
    else return;
    this.nextID.value = this.nextID.value + 1;
    this.sortAllByPriority();
    this.saveData();
  }

  static editItem(
    title: string,
    description: string,
    priority: PRIORITY,
    id: number
  ) {
    const item = new Item();
    item.title = title;
    item.description = description;
    item.priority = priority;
    item.id = id;

    const replaceItemFunction = (list: Item[], item: Item) => {
      list = list.filter((e) => e.id != item.id);
      list.push(item);
      return list;
    };

    if (this.backlog.value.filter((e) => e.id == item.id).length > 0)
      this.backlog.value = replaceItemFunction(this.backlog.value, item);
    else if (this.doing.value.filter((e) => e.id == item.id).length > 0)
      this.doing.value = replaceItemFunction(this.doing.value, item);
    else if (this.done.value.filter((e) => e.id == item.id).length > 0)
      this.done.value = replaceItemFunction(this.done.value, item);

    this.sortAllByPriority();
    this.saveData();
  }

  static getItemByID(id: number) {
    const filteredBacklog = this.backlog.value.filter((e) => e.id == id);
    if (filteredBacklog.length > 0) return filteredBacklog[0];
    const filteredDoing = this.doing.value.filter((e) => e.id == id);
    if (filteredDoing.length > 0) return filteredDoing[0];
    const filteredDone = this.done.value.filter((e) => e.id == id);
    if (filteredDone.length > 0) return filteredDone[0];
    else {
      console.log("Returning null");
      return null;
    }
  }

  static removeItemByID(id: number) {
    this.backlog.value = this.backlog.value.filter((e) => e.id != id);
    this.doing.value = this.doing.value.filter((e) => e.id != id);
    this.done.value = this.done.value.filter((e) => e.id != id);
    this.saveData();
  }

  static sortAllByPriority() {
    const sortingFunction = (a: Item, b: Item) =>
      a.priority < b.priority ? 1 : -1;
    this.backlog.value.sort(sortingFunction);
    this.doing.value.sort(sortingFunction);
    //this.done.value.sort(sortingFunction);
  }

  static saveData() {
    localStorage.setItem("backlog", JSON.stringify(this.backlog.value));
    localStorage.setItem("doing", JSON.stringify(this.doing.value));
    localStorage.setItem("done", JSON.stringify(this.done.value));
  }
}

export class Item {
  public title: string;
  public description: string;
  public priority: PRIORITY;
  public id: number;
}

export enum PRIORITY {
  HIGHEST = 4,
  HIGH = 3,
  MEDIUM = 2,
  LOW = 1,
  LOWEST = 0,
}

export enum ItemState {
  BACKLOG = 0,
  DOING = 1,
  DONE = 2,
}
