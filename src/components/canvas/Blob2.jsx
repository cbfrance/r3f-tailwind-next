'use client'
import { MeshDistortMaterial } from '@react-three/drei'

export const Blob2 = ({ route = '/', ...props }) => {
  // const router = useRouter()
  // const [hovered, hover] = useState(false)
  // useCursor(hovered)
  return (
    <mesh
    // onClick={() => router.push(route)}
    // onPointerOver={() => hover(true)}
    // onPointerOut={() => hover(false)}
    // {...props}
    >
      <sphereGeometry args={[props.sphereGeometry1, props.sphereGeometry2, props.sphereGeometry3]} />
      {/* <MeshDistortMaterial roughness={0} color={hovered ? '#000000' : '#000000'} /> */}
      <MeshDistortMaterial roughness={0} color={'#000000'} />
    </mesh>
  )
}
