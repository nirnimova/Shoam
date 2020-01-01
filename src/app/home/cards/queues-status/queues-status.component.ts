import { Component, ViewChild, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations'
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'home-card-queues-status',
  templateUrl: './queues-status.component.html',
  styleUrls: ['./queues-status.component.less']
})

export class QueuesStatusComponent implements OnInit {
  private mailQueuePlayer: AnimationPlayer;
  private smsQueuePlayer: AnimationPlayer;
  private logQueuePlayer: AnimationPlayer;

  @ViewChild('mailQueueProgressBar', null) mailQueueProgressBar: ElementRef;
  @ViewChild('smsQueueProgressBar', null) smsQueueProgressBar: ElementRef;
  @ViewChild('logQueueProgressBar', null) logQueueProgressBar: ElementRef;

  constructor(
    public homeService: HomeService,
    private renderer: Renderer2,
    private animationBuilder: AnimationBuilder
  ) { }

  ngOnInit(): void {
    this.homeService.homeData$.subscribe(hd => {
      this.createPlayer(this.logQueuePlayer, this.logQueueProgressBar.nativeElement, hd.realtimeData.queues.logQueue).play();
      this.createPlayer(this.smsQueuePlayer, this.smsQueueProgressBar.nativeElement, hd.realtimeData.queues.smsQueue).play();
      this.createPlayer(this.mailQueuePlayer, this.mailQueueProgressBar.nativeElement, hd.realtimeData.queues.mailQueue).play();
    })
  }

  createPlayer(player: AnimationPlayer, progressBar: HTMLInputElement, capacity: number) {
    this.renderer.setProperty(progressBar, 'innerText', `${capacity.toFixed()}%`);

    return this.animationBuilder
      .build([
        style('*'),
        animate('2s', style({ height: `${capacity}%` }))
      ]).create(progressBar);
  }
}
