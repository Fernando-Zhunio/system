import { MethodsHttpService } from './../../../../../../services/methods-http.service';
import { Component, OnInit, Injectable, Output, EventEmitter, Input } from '@angular/core';
import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public id: string, public name: string, public level: any = 1, public expandable = false,
    public isLoading = false) { }
}
@Component({
  selector: 'app-list-tree-dynamic',
  templateUrl: './list-tree-dynamic.component.html',
  styleUrls: ['./list-tree-dynamic.component.css']
})
export class ListTreeDynamicComponent implements OnInit {

  constructor(public methodsHttp: MethodsHttpService, private database: DynamicDatabase) { }

  @Input() url: string = 'catalogs/publications/ml/categories';
  treeControl: FlatTreeControl<DynamicFlatNode>;
  @Output() selectedNode = new EventEmitter<ICategoriesParent | ICategoriesChildren>();

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;


  ngOnInit(): void {

    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.database, this.methodsHttp, this.url);

    this.methodsHttp.methodPost(this.url, null).subscribe(
      (data) => {
        this.dataSource.data = data.data.map((element: ICategoriesParent) => new DynamicFlatNode(element.id, element.name, 0, true));
        this.database.setDataMap(data.data);
      }
    );
  }

  selectedItem(node: ICategoriesParent | ICategoriesChildren) {
    this.selectedNode.emit(node);
  }

}

export interface ICategoriesParent {
  id: string;
  name: string;
  children: ICategoriesChildren[] | null;
}

interface ICategoriesChildren {
  id: string;
  name: string;
  children?: ICategoriesChildren[];
  total_items_in_this_category?: number;
}

@Injectable({ providedIn: 'root' })
export class DynamicDatabase {
  dataMap = new Map<string, ICategoriesChildren | ICategoriesParent>();

  setDataMap(data: ICategoriesParent[]) {
    data.forEach(element => {
      this.dataMap.set(element.id, element);
    });
  }

  getChildren(node: string): ICategoriesChildren | ICategoriesParent | undefined {
    return this.dataMap.get(node);
  }

  isExpandable(node: string): boolean {
    return this.dataMap.has(node);
  }
}



export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private _database: DynamicDatabase, private methodsHttp: MethodsHttpService, private url: String) { }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  disconnect(_collectionViewer: CollectionViewer): void { }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    const children = this._database.getChildren(node.id);
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    if (!expand) {
      let count = 0;
      for (let i = index + 1; i < this.data.length
        && this.data[i].level > node.level; i++, count++) { }
      this.data.splice(index + 1, count);
      this.dataChange.next(this.data);
      return;
    }

    node.isLoading = true;
    this.methodsHttp.methodPost(`${this.url}/${node.id}`, null).subscribe(
      (data) => {

        // this.dataChange.next(this.data);
        // children.children.map((element: ICategoriesChildren) => new DynamicFlatNode(element.id, element.name, node.level + 1, true));
        this._database.setDataMap(data.data);
        if (data.data.length <= 0) {
          node.isLoading = false;
          node.expandable = false;
          this.data[index].expandable = false;
          this.dataChange.next(this.data);
          return;
        }
        if (expand) {
          const nodes = data.data.map((element: ICategoriesChildren) =>
            new DynamicFlatNode(element.id, element.name, node.level + 1, true, false));
          this.data.splice(index + 1, 0, ...nodes);
        } else {
          let count = 0;
          for (let i = index + 1; i < this.data.length
            && this.data[i].level > node.level; i++, count++) { }
          this.data.splice(index + 1, count);
        }
        this.dataChange.next(this.data);
        node.isLoading = false;
      }
    );

    // setTimeout(() => {
    //   if (expand) {
    //     const nodes = children.map(name =>
    //       new DynamicFlatNode(name, node.level + 1, this._database.isExpandable(name)));
    //     this.data.splice(index + 1, 0, ...nodes);
    //   } else {
    //     let count = 0;
    //     for (let i = index + 1; i < this.data.length
    //       && this.data[i].level > node.level; i++, count++) { }
    //     this.data.splice(index + 1, count);
    //   }

    //   // notify the change
    // this.dataChange.next(this.data);
    //   node.isLoading = false;
    // }, 1000);
  }
}
