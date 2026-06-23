import Point from "./Point";
import Vector from "./Vector";

export default class Plane {
    
    /**
     * 
     * @param {Point} point 
     * @param {Vector} normal 
     */
    constructor(point, normal){
        this.point = point; 
        this.normal = normal
    }


    /**
     * 
     * @param {Point} linePoint 
     * @param {Vector} projVector 
     * @returns 
     */
    ProjectPointOnPlaneByVector( linePoint, 
        projVector)
    {
        const cosBtwNormalAndDirecton = this.normal.dot(projVector.normalize());

        if (cosBtwNormalAndDirecton == 0)
        {
            return null; //perpendicular to vector, no intersection possible. 
        }

        const linePointV = linePoint.toVector();

        const cosinePlatePoint = this.normal.dot(this.point.toVector());
        const cosineLinePoint = this.normal.dot(linePointV);
        const LenghtOfPerpendicularBtwPlaneAndPoint = cosinePlatePoint - cosineLinePoint;

        const distanceFromPointToPlaneInLineDirection = LenghtOfPerpendicularBtwPlaneAndPoint / cosBtwNormalAndDirecton;

        const PointAtPlane = linePointV.plus(
                                            projVector.normalize()
                                            .scale(distanceFromPointToPlaneInLineDirection)
                              ).toPoint();
        const planeNormal = this.ProjectVectorOnPlane(linePoint, projVector);

        return PointAtPlane;
    }

    /**
     * 
     * @param {Vector} vectorToProject 
     * @param {Vector} lineDirection 
     * @returns {Vector}
     */
    ProjectVectorOnPlane(vectorToProject, lineDirection)
    {
        if (this.normal.dot(lineDirection.normalize()) == 0)
        {
            return null;
        }
        const vv = new Vector(  this.point.X + vectorToProject.X,
                                this.point.Y + vectorToProject.Y,
                                this.point.Z + vectorToProject.Z);
        const d1 = this.normal.dot(this.point.toVector()) - this.normal.dot(vv);
        const delimetr = this.normal.dot(lineDirection.normalize());
        const t = d1 / delimetr;
        console.log("vv:",vectorToProject);
        const projected = vectorToProject.toVector().plus(lineDirection.normalize().scale(t));
        return projected; 
    }
}