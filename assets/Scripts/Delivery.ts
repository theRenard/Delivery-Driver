import {
  _decorator,
  Component,
  Collider2D,
  Contact2DType,
  Color,
  SpriteComponent,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("Delivery")
export class Delivery extends Component {
  @property destroyDelay = 100;

  @property hasPackageColor: Color = new Color(255, 255, 255, 255);

  @property noPackageColor: Color = new Color(255, 255, 255, 255);

  hasPackage = false;

  spriteComponent: SpriteComponent = null;

  start() {
    this.spriteComponent = this.getComponent(SpriteComponent);
    let collider = this.getComponent(Collider2D);
    if (collider) {
      collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
    }
  }

  onBeginContact(contact: any, selfCollider: any, otherCollider: any) {
    if (selfCollider.tag === 2 && !this.hasPackage) {
      this.hasPackage = true;
      this.spriteComponent.color = this.hasPackageColor;
      setTimeout(() => {
        selfCollider.node.destroy();
      }, 100);
    }
    if (selfCollider.tag === 3 && this.hasPackage) {
      this.spriteComponent.color = this.noPackageColor;
      this.hasPackage = false;
    }
  }
}
