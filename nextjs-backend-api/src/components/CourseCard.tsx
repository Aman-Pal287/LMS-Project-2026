import Image from 'next/image';
import Link from 'next/link';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function CourseCard({
  id,
  title,
  description,
  price,
  imageUrl,
}: CourseCardProps): React.ReactElement {
  return (
    <article className="course-card">
      <Image src={imageUrl} alt={title} className="course-image" width={900} height={600} />
      <div className="course-body">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="course-footer">
          <span>INR {price}</span>
          <Link href={`/courses/${id}`} className="secondary-btn">
            View Course
          </Link>
        </div>
      </div>
    </article>
  );
}
