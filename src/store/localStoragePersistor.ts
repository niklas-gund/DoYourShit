import { Ref, ref } from "vue";

export default class DYSStore {
  static backlog: Ref<Item[]> = ref([]);
  static doing: Ref<Item[]> = ref([]);
  static done: Ref<Item[]> = ref([]);

  static loadData() {
    const backlog = localStorage.getItem("backlog");
    const doing = localStorage.getItem("doing");
    const done = localStorage.getItem("done");
    if (backlog) this.backlog.value = JSON.parse(backlog);
    if (doing) this.doing.value = JSON.parse(doing);
    if (done) this.done.value = JSON.parse(done);
  }

  static saveData() {
    localStorage.setItem("backlog", JSON.stringify(this.backlog));
    localStorage.setItem("doing", JSON.stringify(this.doing));
    localStorage.setItem("done", JSON.stringify(this.done));
  }
}

export class Item {
  public title: string;
  public description: string;
  public priority: PRIORITY;
}

export enum PRIORITY {
  HIGHEST = 4,
  HIGH = 3,
  MEDIUM = 2,
  LOW = 1,
  LOWEST = 0,
}
