import React, {useCallback, useEffect, useState} from "react";
import {Cylinder, Sphere} from "@react-three/drei";
import {attackColliders} from "../../../../../Player/hooks/attack";
import {useBody} from "../../../../../../../physics/components/Physics/hooks";
import {BodyShape, BodyType} from "../../../../../../../physics/bodies";
import {Vec2} from "planck-js";
import {COLLISION_FILTER_GROUPS} from "../../../../../../../physics/collisions/filters";
import {getMobHealthManager} from "../../../../../../../state/mobs";

const tempVec2 = Vec2(0, 0)

const AttackCollider: React.FC<{
    id: number,
    x: number,
    y: number,
    vX: number,
    vY: number,
    expires: number,
}> = ({id, x, y, vX, vY, expires}) => {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setMounted(true)
        }, 20)
    })

    const size = 1.25

    const onCollideStart = useCallback(({mobID}: {
        mobID: number,
    }) => {
        const manager = getMobHealthManager(mobID)
        if (!manager) return
        manager.health -= 25
    }, [])

    const [ref, api] = useBody(() => ({
        type: BodyType.dynamic,
        shape: BodyShape.circle,
        radius: size,
        position: Vec2(x, y),
        fixtureOptions: {
            isSensor: true,
            filterCategoryBits: COLLISION_FILTER_GROUPS.attackCollider,
            filterMaskBits: COLLISION_FILTER_GROUPS.attackReceiver,
        }
    }), {
        onCollideStart,
    })

    useEffect(() => {

        tempVec2.set(vX, vY)
        api.setLinearVelocity(tempVec2)

        const now = Date.now()

        let timeout = setTimeout(() => {
            let index = attackColliders.colliders.findIndex((collider) => collider.id === id)
            if (index >= 0) {
                attackColliders.colliders.splice(index, 1)
            }
        }, expires - now)

        return () => {
            clearTimeout(timeout)
        }

    }, [id, expires])

    return (
        <group ref={ref} position={[x, 0, y]}>
            {
                mounted && (
                    <Cylinder args={[size, size, 2, 20]} position={[0, 1, 0]}>
                        <meshBasicMaterial attach="material" color={"red"} transparent
                                           opacity={0.85}/>
                    </Cylinder>
                )
            }
        </group>
    );
};

export default AttackCollider;