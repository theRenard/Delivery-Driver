import {
  _decorator,
  Component,
  Vec3,
  input,
  Input,
  EventKeyboard,
  KeyCode,
  Collider2D,
  Contact2DType,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Driver")
export class Driver extends Component {
  @property steerSpeed: number = 200;

  @property moveSpeed: number = 5;

  @property slowSpeed: number = 2;

  @property boostSpeed: number = 8;

  @property time = 6;

  @property angle = 360;

  steerAmmount: number = 0;

  moveAmmount: number = 0;

  onLoad() {
    // PhysicsSystem2D.instance.debugDrawFlags =
    //   EPhysics2DDrawFlags.Aabb |
    //   EPhysics2DDrawFlags.Pair |
    //   EPhysics2DDrawFlags.CenterOfMass |
    //   EPhysics2DDrawFlags.Joint |
    //   EPhysics2DDrawFlags.Shape;

    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  start() {
    let collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
      collider.on(Contact2DType.PRE_SOLVE, this.onPreSolve, this);
    }
  }

  onBeginContact(contact: any, selfCollider: any, otherCollider: any) {
    if (selfCollider.tag === 4) {
      this.moveSpeed = this.boostSpeed;
      setTimeout(() => {
        selfCollider.node.destroy();
      }, 100);
    }
  }

  onPreSolve() {
    this.moveSpeed = this.slowSpeed;
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.steerAmmount = 1;
        console.log("Press a key");
        break;
      case KeyCode.ARROW_RIGHT:
        this.steerAmmount = -1;
        console.log("Press d key");
        break;
      case KeyCode.ARROW_UP:
        this.moveAmmount = 100;
        console.log("Press w key");
        break;
      case KeyCode.ARROW_DOWN:
        this.moveAmmount = -100;
        console.log("Press s key");
        break;
    }
  }

  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
        this.steerAmmount = 0;
        console.log("Release a key");
        break;
      case KeyCode.ARROW_RIGHT:
        this.steerAmmount = 0;
        console.log("Release d key");
        break;
      case KeyCode.ARROW_UP:
        this.moveAmmount = 0;
        console.log("Release w key");
        break;
      case KeyCode.ARROW_DOWN:
        this.moveAmmount = 0;
        console.log("Release s key");
        break;
    }
  }

  update(deltaTime: number) {
    this.node.angle += this.steerAmmount * this.steerSpeed * deltaTime;

    this.node.translate(
      new Vec3(0, this.moveAmmount * this.moveSpeed * deltaTime, 0)
    );
  }
}
