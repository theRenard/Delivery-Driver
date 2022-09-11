import { _decorator, PhysicsSystem2D,
    EPhysics2DDrawFlags, Component, Node, tween, Vec3, Quat, input, Input, EventKeyboard, KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Driver')
export class Driver extends Component {

    // add serializable field
    @property
    steerSpeed: number = 1;

    // add serializable field
    @property
    moveSpeed: number = 1;

    @property
    time = 6;

    @property
    angle = 360;

    steerAmmount: number = 0;
    moveAmmount: number = 0;


    onLoad () {

        PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
        EPhysics2DDrawFlags.Pair |
        EPhysics2DDrawFlags.CenterOfMass |
        EPhysics2DDrawFlags.Joint |
        EPhysics2DDrawFlags.Shape;

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.steerAmmount = 1;
                console.log('Press a key');
                break;
            case KeyCode.KEY_D:
                this.steerAmmount = -1;
                console.log('Press d key');
                break;
            case KeyCode.KEY_W:
                this.moveAmmount = 100;
                console.log('Press w key');
                break;
            case KeyCode.KEY_S:
                this.moveAmmount = -100;
                console.log('Press s key');
                break;
        }
    }

    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                this.steerAmmount = 0;
                console.log('Release a key');
                break;
            case KeyCode.KEY_D:
                this.steerAmmount = 0;
                console.log('Release d key');
                break;
            case KeyCode.KEY_W:
                this.moveAmmount = 0;
                console.log('Release w key');
                break;
            case KeyCode.KEY_S:
                this.moveAmmount = 0;
                console.log('Release s key');
                break;
        }
    }


    start() {
        // tween(this.node)
        //     .by(this.time, { eulerAngles: new Vec3(0, 0, this.angle) })
        //     .repeatForever()
        //     .start()
    }

    update(deltaTime: number) {
        this.node.rotate(new Quat(0, 0, this.steerAmmount * this.steerSpeed * deltaTime));
        this.node.translate(
            new Vec3(
                0,
                this.moveAmmount * this.moveSpeed * deltaTime,
                0
            )
        );
    }
}

