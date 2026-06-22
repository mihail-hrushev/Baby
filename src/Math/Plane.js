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
     * @param {Vector} lineDirection 
     * @returns 
     */
    ProjectPointOnPlaneByVector( linePoint, 
        lineDirection)
    {
        const cosBtwNormalAndDirecton = this.normal.dot(lineDirection.normalize());

        if (cosBtwNormalAndDirecton == 0)
        {
            return null; //perpendicular to vector, no intersection possible. 
        }

        const linePointV = point.toVector();

        const cosinePlatePoint = this.normal.dot(this.point.toVector());
        const cosineLinePoint = this.normal.dot(linePointV);
        const LenghtOfPerpendicularBtwPlaneAndPoint = cosinePlatePoint - cosineLinePoint;

        const distanceFromPointToPlaneInLineDirection = LenghtOfPerpendicularBtwPlaneAndPoint / cosBtwNormalAndDirecton;

        const PointAtPlane = linePointV.plus(
                                            lineDirection.normalize()
                                            .scale(distanceFromPointToPlaneInLineDirection)
                              ).toPoint();
        const planeNormal = ProjectVectorOnPlane(linePoint.normal, lineDirection);

        return new PointWithNormal(PointAtPlane, planeNormal);
    }

    /**
     * 
     * @param {Vector} vectorToProject 
     * @param {Vector} lineDirection 
     * @returns {Vector}
     */
    ProjectVectorOnPlane(vectorToProject, lineDirection)
    {
        if (this.normal.Dot(lineDirection.Normalize()) == 0)
        {
            return null;
        }
        const vv = new Vector(  PlanePoint.X + vectorToProject.X,
                                PlanePoint.Y + vectorToProject.Y,
                                PlanePoint.Z + vectorToProject.Z);
        const d1 = Normal.Dot(PlanePoint.ToVector()) - Normal.Dot(vv);
        const delimetr = Normal.Dot(lineDirection.Normalize());
        const t = d1 / delimetr;
        const projected = vectorToProject.plus(lineDirection.normalize().scale(t));
        return projected; 
    }
}