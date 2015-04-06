namespace Planr.Models
{
    public class Sequence
    {
        //i: semester, j:year k: courses(sequence)
        public Course[,,] sequence = new Course[6, 5, 5];
    }
}