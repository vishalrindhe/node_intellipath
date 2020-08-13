import { Component, OnInit } from '@angular/core';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';
import { ActivatedRoute, Route, Router, Params } from '@angular/router';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[] = [];
  tasks: Task[] = []; 
  listId: string;

  constructor(private taskService: TaskService,
              private route: ActivatedRoute,
              private router: Router ) { }

  ngOnInit() {
    this.taskService.getLists()
      .subscribe((lists: List[]) => this.lists = lists);
  
    this.route.params.subscribe((params: Params)  => {
      this.listId = params.listId;
      if(!this.listId) return;
      this.taskService.getTasks(this.listId).subscribe((tasks: Task[]) => this.tasks = tasks);
    });
  }

  onTaskClick(task: Task) {
    this.taskService.setComplete(this.listId, task).subscribe(() => task.completed = !task.completed)
  }

}
 